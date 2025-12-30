import {
  CircleIcon,
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  AdjustmentsHorizontalIcon,
  LayoutDashboardIcon,
} from "vue-tabler-icons";
import quotation from "@/assets/icons/quotation.svg";
import certificate from "@/assets/icons/certificate.svg";
import payment from "@/assets/icons/payment.svg";
import claim from "@/assets/icons/claim.svg";
import transaction from "@/assets/icons/transaction.svg";
import wallet from "@/assets/icons/wallet.svg";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },

  {
    title: "Quotations",
    icon: quotation,
    to: "/quotations",

    children: [
      {
        title: "All Quotation",
        icon: CircleIcon,
        to: "/quotations",
      },
      {
        title: "Generate Quotation",
        icon: CircleIcon,
        to: "/quotations/generate",
      },
    ],
  },
  // {
  //   title: "Policy",
  //   icon: AlertCircleIcon,
  //   to: "/policy",
  // },

  {
    title: "Certificates",
    icon: certificate,
    to: "/certificates",
  },
  {
    title: "Payments",
    icon: payment,
    to: "/payments",
  },
  {
    title: "Claim",
    icon: claim,
    to: "/claims",
  },
  {
    title: "Transactions",
    icon: transaction,
    to: "/transactions",
  },
  {
    title: "Wallet",
    icon: wallet,
    to: "/wallet",
  },

  {
    title: "Logout",
    icon: CircleDotIcon,
    to: "/logout",
  },

];

export default sidebarItem;
