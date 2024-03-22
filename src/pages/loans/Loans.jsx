import { useState } from "react";
import LoansTable from "./components/LoansTable";
import SuppliesTable from "./components/SuppliesTable";
import { useUserStore } from "../../stores";

const Loans = () => {
    const [reset, setReset] = useState(false);
    const user = useUserStore((state) => state.user);

    return (
        <div className="m-10 shadow-lg">
            <div className="mb-10">
                <h2 className="mb-5 text-2xl font-bold text-gray-800">
                    Insumos Disponibles
                </h2>
                <SuppliesTable reset={reset} setReset={setReset} />
            </div>
            <div>
                <h2 className="mb-5 text-2xl font-bold text-gray-800">
                    Mis prestamos
                </h2>
                {user.user.Role.roleName === "maestra" ||
                user.user.Role.roleName === "maestro" ? (
                    <LoansTable reset={reset} setReset={setReset} />
                ) : null}
            </div>
        </div>
    );
};

export default Loans;
