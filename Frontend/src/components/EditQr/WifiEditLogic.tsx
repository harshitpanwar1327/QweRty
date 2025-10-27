import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface WifiContent {
  wifiSsid?: string;
  wifiPassword?: string;
  wifiEncryption?: string;
}

interface WifiLogicProps {
  content: WifiContent;
  setContent: Dispatch<SetStateAction<WifiContent>>;
}

const WifiEditLogic: React.FC<WifiLogicProps> = ({ content, setContent }) => {
  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiEncryption, setWifiEncryption] = useState<string>("");

  useEffect(() => {
    setContent({ wifiSsid, wifiPassword, wifiEncryption });
  }, [wifiSsid, wifiPassword, wifiEncryption, setContent]);

  useEffect(() => {
    if (content?.wifiSsid && content.wifiSsid !== wifiSsid) {
      setWifiSsid(content.wifiSsid);
    }
    if (content?.wifiPassword && content.wifiPassword !== wifiPassword) {
      setWifiPassword(content.wifiPassword);
    }
    if (content?.wifiEncryption && content.wifiEncryption !== wifiEncryption) {
      setWifiEncryption(content.wifiEncryption);
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network name (SSID)</label>
        <input
          type="text"
          placeholder="E.g. HomeWifi"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={wifiSsid}
          onChange={(e) => setWifiSsid(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Network password</label>
        <input
          type="password"
          placeholder="E.g. MyPassword"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-500">Type of encryption</label>
        <select
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={wifiEncryption}
          onChange={(e) => setWifiEncryption(e.target.value)}
          required
        >
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2-EAP">WPA2-EAP</option>
          <option value="nopass">nopass</option>
        </select>
      </div>
    </div>
  );
};

export default WifiEditLogic;