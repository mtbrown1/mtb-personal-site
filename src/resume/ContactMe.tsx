import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, makeStyles, Spinner, Textarea, tokens } from "@fluentui/react-components";
import { SendRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { sendContactEmail } from "../hooks/sendContactEmail";

export interface IContactMeProps {
    show: boolean;
    setShow(val: boolean): void;
}

export interface ContactMeForm {
    name: string;
    company: string;
    email: string;
    message: string;
}

const useStyles = makeStyles({
    dialogBackground: {
        backgroundColor: tokens.colorBrandBackground,
    },
    errorMessage: {
        color: tokens.colorPaletteRedForeground2,
    },
    sendButton: {
        justifyContent: "space-evenly",
    },
    sendIcon: {
        fontSize: tokens.fontSizeBase400,
    }
});

export function ContactMe(props: IContactMeProps) {
    const { show, setShow } = props;
    const defaultForm: ContactMeForm = {
        name: "",
        company: "",
        email: "",
        message: "",
    };
    const defaultFormValidation = {
        name: false,
        company: true,
        email: false,
        message: false,
    };
    const [form, setForm] = useState(defaultForm)
    const [formValidation, setFormValidation] = useState(defaultFormValidation);
    const [showValidation, setShowValidation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formSubmitting, setFormSubmitting] = useState(false);

    const styles = useStyles();

    const validateAndSend = () => {
        const newFormValidation = {
            name: !!form.name,
            company: true,
            email: !!form.email && (/^[a-z0-9_.±]+@[a-z0-9.-]+(\.[a-z]{2,})+$/gi).test(form.email),
            message: !!form.message,
        }
        if (Object.values(newFormValidation).every(i => i)) {
            setFormSubmitting(true);
            sendContactEmail(form).then((value) => {
                console.log(value)
                if (value) {
                    setShow(false);
                    setForm(defaultForm);
                    setFormValidation(defaultFormValidation);
                    setErrorMessage("");
                    setShowValidation(false);
                } else {
                    setErrorMessage("There was a problem submitting your request.");
                }
                setFormSubmitting(false);
            });
        } else {
            setFormValidation(newFormValidation);
            setShowValidation(true);
        }
    }

    const updateField = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }

    return (
        <Dialog open={show} onOpenChange={(_event, data) => setShow(data.open)}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Contact Matt</DialogTitle>
                    <DialogContent>
                        <Field label="Name" required validationState={!showValidation || formValidation.name ? "none" : "error"}>
                            <Input value={form.name} onChange={e => { updateField("name", e.target.value) }} disabled={formSubmitting} />
                        </Field>
                        <Field label="Company" >
                            <Input value={form.company} onChange={e => { updateField("company", e.target.value) }} disabled={formSubmitting} />
                        </Field>
                        <Field label="Email" required validationState={!showValidation || formValidation.email ? "none" : "error"}>
                            <Input value={form.email} onChange={e => { updateField("email", e.target.value) }} disabled={formSubmitting} />
                        </Field>
                        <Field label="Message" required validationState={!showValidation || formValidation.message ? "none" : "error"}>
                            <Textarea value={form.message} onChange={e => { updateField("message", e.target.value) }} disabled={formSubmitting} />
                        </Field>
                        <div className={styles.errorMessage}>{errorMessage}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button className={styles.sendButton} appearance="primary" onClick={() => { validateAndSend() }} disabled={formSubmitting} >
                            Send
                            {formSubmitting ?
                                <Spinner size="tiny" />
                                :
                                <SendRegular className={styles.sendIcon} />
                            }
                        </Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" disabled={formSubmitting} >Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}