import { JSX } from "react";

interface INavBarProps {
    pages: IPageConfig[];
    currentPage: string;
    setCurrentPage(page: string): void;
}

export interface IPageConfig {
    name: string;
    header: string;
    page: JSX.Element;
}

export function NavBar(props: INavBarProps) {
    const { currentPage, pages, setCurrentPage } = props;
    
    return (
        <div>
            {pages.map(pageConfig => <div style={{fontWeight: currentPage==pageConfig.name ? "bold" : "normal"}} onClick={()=>setCurrentPage(pageConfig.name)}>{pageConfig.name}</div>)}
        </div>
    )
}