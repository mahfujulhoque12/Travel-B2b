import CardDescription from "@/components/atoms/CardDescription";
import CardTitle from "@/components/atoms/CardTitle";
import Switch from "@/components/atoms/Switch";
import React, { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
const notificationSetting = [
  {
    id: "system-alerts",
    title: "System Alerts",
    description: "Critical issues, system updates, downtime notices.",
    enabled: true,
  },
  {
    id: "user-messages",
    title: "User Messages",
    description: "Direct messages from other users or system admins.",
    enabled: true,
  },
  {
    id: "preferences",
    title: "Settings and Preferences",
    description: "Allow users to customize notification preferences.",
    enabled: false,
  },
];

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] =
    useState<NotificationSetting[]>(notificationSetting);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-[#243045]">
        Notification settings
      </h2>
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-[#243045]">
                {setting.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {setting.description}
              </CardDescription>
            </div>
            <Switch
              toggleSetting={toggleSetting}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                setting.enabled ? "bg-blue-gradient" : "bg-gray-300"
              }`}
              enabled={setting.enabled}
              id={setting.id}
              aria-pressed={setting.enabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
