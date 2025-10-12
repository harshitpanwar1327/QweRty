import React, { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface WifiContent {
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: string;
}

interface WifiLogicProps {
  setContent: Dispatch<SetStateAction<WifiContent>>;
}

const WifiLogic: React.FC<WifiLogicProps> = ({ setContent }) => {
  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiEncryption, setWifiEncryption] = useState<string>("");

  useEffect(() => {
    setContent({ wifiSsid, wifiPassword, wifiEncryption });
  }, [wifiSsid, wifiPassword, wifiEncryption, setContent]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Network name (SSID)</label>
        <input
          type="text"
          placeholder="E.g. HomeWifi"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={wifiSsid}
          onChange={(e) => setWifiSsid(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Network password</label>
        <input
          type="password"
          placeholder="E.g. MyPassword"
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Type of encryption</label>
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

export default WifiLogic;