import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const RedirectAuth = () => {
    const [count, setCount] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);

        if (count === 0) {
            return navigate("/auth");
        };

        return () => clearInterval(interval);

    }, [count, navigate]);

    return (
        <div className="w-full flex items-center justify-center border border-cyan-300 text-green-300 font-normal rounded-sm p-3">
            <p>Must be authenticated - redirecting you to login in - { count } seconds.</p>
        </div>
    )
}
export default RedirectAuth