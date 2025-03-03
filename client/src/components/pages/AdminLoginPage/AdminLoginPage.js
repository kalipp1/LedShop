import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "config";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./AdminLoginPage.module.scss";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null); // "loading", "error", "success"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
            });

            if (!res.ok) {
                throw new Error("Invalid login or password");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            setStatus("success");
            navigate("/admin/dashboard");
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className={styles.adminLoginContainer}>
            <h2>Admin Login</h2>
            <Form onSubmit={handleSubmit} className={styles.adminLoginForm}>
                {status === "error" && <Alert variant="danger">Invalid login or password</Alert>}
                {status === "success" && <Alert variant="success">Login successful! Redirecting...</Alert>}
                <Form.Group className={styles.formInput} controlId="formLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter admin login"
                    />
                </Form.Group>
                <Form.Group className={styles.formInput} controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                    />
                </Form.Group>
                <Button className={styles.button} variant="primary" type="submit" disabled={status === "loading"}>
                    {status === "loading" ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
            </Form>
        </div>
    );
};

export default AdminLoginPage;