import { ContactMeForm } from "../resume/ContactMe";

export async function sendContactEmail(form: ContactMeForm): Promise<boolean> {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // return true;
    const url = "https://brownmafunctions.azurewebsites.net/api/emailMe?code=lx7F_NowDTwTvSwzdNbpiojNzQEnQnzPGjpA2iA5Nq-qAzFu04qcsg==";
    try {
        const body = JSON.stringify(form);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
    } catch (error: any) {
        return false;
    }
    return true;
}