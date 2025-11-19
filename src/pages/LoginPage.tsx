import LoginLayout from "../components/login/LoginLayout";
import LoginForm from "../components/login/LoginForm";

export function LoginPage() {
    return (
        <LoginLayout>
            <div className="flex items-center justify-center">
                    <LoginForm />
                </div>
        </LoginLayout>
    );
}