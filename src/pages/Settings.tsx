
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and application preferences.
          </p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Profile Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Role
                </label>
                <Input id="role" placeholder="Your role" />
              </div>

              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Language
                </label>
                <Input id="language" placeholder="Select language" />
              </div>

              <div>
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Timezone
                </label>
                <Input id="timezone" placeholder="Select timezone" />
              </div>

              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
