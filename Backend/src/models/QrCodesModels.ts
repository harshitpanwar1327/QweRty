interface Whatsapp {
  whatsappNumber?: string,
  whatsappMessage?: string
}

interface Wifi {
  ssid?: string,
  password?: string,
  encryption?: string
}

interface QrContent {
  url?: string;
  text?: string;
  email?: string;
  whatsapp?: Whatsapp;
  wifi?: Wifi;
  location?: string;
  vCard?: string;
}

interface QrDesign {
  borderColour?: string;
  backgroundColour?: string;
  logo?: string;
}

interface QrConfiguration {
  from_date?: string;
  to_date?: string;
  scan_limit?: number;
  password?: string;
}

interface QrData {
  user_id?: string;
  qr_id?: number;
  name: string;
  qr_type: string;
  content: QrContent;
  design: QrDesign;
  configuration?: QrConfiguration;
}

export class QrModels {
  user_id?: string;
  qr_id?: number;
  name: string;
  qr_type: string;
  content: QrContent;
  design: QrDesign;
  configuration?: QrConfiguration;

  constructor(data: QrData) {
    this.user_id = data.user_id;
    this.name = data.name;
    this.qr_type = data.qr_type;
    this.content = data.content;
    this.design = data.design;
    this.configuration = data.configuration;
  }
}