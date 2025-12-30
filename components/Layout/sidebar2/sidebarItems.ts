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
    to: "/motor/thirdparty",
  },


  { header: "Motor Insurance" },

  {
    title: "Third Party",
    icon: quotation,
    to: "#",

    children: [
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
    ],
  },

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
    ],
  },

];

export default sidebarItem;
