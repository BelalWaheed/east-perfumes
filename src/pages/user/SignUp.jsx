import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNewUser } from "@/redux/slices/userSlice";
import { setLoggedUser, setLogged } from "@/redux/slices/profileSlice";
import { useTranslation } from "@/hooks/useTranslation";
import Swal from "sweetalert2";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers } = useSelector((s) => s.user);
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim())
      return Swal.fire({ icon: "error", text: t("auth.nameRequired") });
    if (!form.email.trim())
      return Swal.fire({ icon: "error", text: t("auth.emailRequired") });
    if (!/\S+@\S+\.\S+/.test(form.email))
      return Swal.fire({ icon: "error", text: t("auth.invalidEmailFormat") });
    if (!form.gender)
      return Swal.fire({ icon: "error", text: t("auth.selectGender") });
    if (form.password.length < 6)
      return Swal.fire({ icon: "error", text: t("auth.passwordMinLength") });

    const exists = allUsers.find((u) => u.email === form.email);
    if (exists)
      return Swal.fire({
        icon: "error",
        text: t("auth.emailAlreadyRegistered"),
      });

    try {
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        gender: form.gender,
        role: "user",
        totalPoints: 0,
        usedPoints: 0,
        availablePoints: 0,
        purchasedProducts: [],
      };

      const result = await dispatch(addNewUser(newUser)).unwrap();
      localStorage.setItem("ep-userId", result.id);
      dispatch(setLoggedUser(result));
      dispatch(setLogged(true));
      navigate("/");
    } catch {
      Swal.fire({ icon: "error", text: t("admin.error") });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card-premium p-8 sm:p-10 glass">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("common.signUp")}
            </h1>
            <p className="text-muted-foreground">{t("auth.niceToMeet")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.name")}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("auth.yourName")}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.email")}
              </label>
              <input
                name="email"
                type="text"
                value={form.email}
                onChange={handleChange}
                placeholder={t("auth.yourEmail")}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.yourGender")}
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              >
                <option value="">{t("auth.selectGenderPlaceholder")}</option>
                <option value="male">{t("auth.male")}</option>
                <option value="female">{t("auth.female")}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.password")}
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={t("auth.enterPassword")}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-premium py-3.5 text-white font-semibold text-lg"
            >
              {t("common.signUp")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("auth.haveAccount")}{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              {t("common.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
