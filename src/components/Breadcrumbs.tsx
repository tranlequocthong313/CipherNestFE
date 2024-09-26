import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const routeNameMap: { [key: string]: string } = {
    "/help": "Help",
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) {
        return null;
    }

    return (
        <MUIBreadcrumbs
            aria-label="breadcrumb"
            sx={{ mb: 3, display: "flex", justifyContent: "center" }}
        >
            <Link component={RouterLink} color="inherit" to="/">
                Home
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                const routeName = routeNameMap[to] || value;

                return isLast ? (
                    <Typography color="text.primary" key={to}>
                        {routeName}
                    </Typography>
                ) : (
                    <Link component={RouterLink} color="inherit" to={to} key={to}>
                        {routeName}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;
