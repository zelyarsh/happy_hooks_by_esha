import GeneralSettings from "../../components/admin/settings/GeneralSettings";
import ShippingSettings from "../../components/admin/settings/ShippingSettings";
import PaymentSettings from "../../components/admin/settings/PaymentSettings";
import SocialLinks from "../../components/admin/settings/SocialLinks";

function Settings() {
  return (
    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Store Settings
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Website Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your crochet store configuration.
        </p>

      </div>

      <GeneralSettings />

      <ShippingSettings />

      <PaymentSettings />

      <SocialLinks />

    </div>
  );
}

export default Settings;