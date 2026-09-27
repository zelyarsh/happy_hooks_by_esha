import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileOverview from "../components/profile/ProfileOverview";

function Profile() {
  return (
    <section className="bg-pink-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            My Account
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Welcome Back 👋
          </h1>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          <ProfileSidebar />

          <ProfileOverview />

        </div>

      </div>

    </section>
  );
}

export default Profile;