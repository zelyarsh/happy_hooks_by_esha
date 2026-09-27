import AdminLoginForm from "../../components/admin/auth/AdminLoginForm";
import AdminLoginIllustration from "../../components/admin/auth/AdminLoginIllustration";

function AdminLogin() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-pink-50">

      <div className="flex justify-center items-center bg-white p-10">

        <AdminLoginForm />

      </div>

      <AdminLoginIllustration />

    </section>
  );
}

export default AdminLogin;