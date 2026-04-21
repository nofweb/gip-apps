import {
  CircleIcon,
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
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

  { header: "Motor Insurance" },

  {
    title: "Comprehensive",
    icon: quotation,
    to: "#",
    children: [
      {
        title: "My Policy",
        icon: CircleIcon,
        to: "/motor/comprehensive/policies",
      },
      {
        title: "Buy Policy",
        icon: CircleIcon,
        to: "/motor/comprehensive/policies/buy",
      },
      {
        title: "Renew Policy",
        icon: CircleIcon,
        to: "/motor/comprehensive/renew",
      },
    ],
  },

  {
    title: "Third Party",
    icon: quotation,
    to: "#",
    children: [
      {
        title: "Dashboard",
        icon: CircleIcon,
        to: "/motor/thirdparty",
      },
      {
        title: "My Policy",
        icon: CircleIcon,
        to: "/motor/thirdparty/policies",
      },
      {
        title: "Buy Policy",
        icon: CircleIcon,
        to: "/motor/thirdparty/policies/buy",
      },
      {
        title: "Renew Policy",
        icon: CircleIcon,
        to: "/motor/thirdparty/renew",
      },
    ],
  },

  { header: "Marine Insurance" },

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
    title: "Logout",
    icon: CircleDotIcon,
    to: "/logout",
  },
];

export default sidebarItem;
