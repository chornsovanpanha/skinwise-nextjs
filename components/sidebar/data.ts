import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  HelpCircle,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";
export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  overviews: [
    {
      name: "Overview",
      url: "/dashboard",
      isActive: true,
      icon: PieChart,
    },
  ],
  navMain: [
    {
      title: "Products",
      icon: SquareTerminal,
      isActive: false,
      url: "/dashboard/products",
      items: [
        {
          title: "Data Scaping",
          url: "/dashboard/products/scape",
        },
        {
          title: "View All",
          url: "/dashboard/products",
        },
        {
          title: "Add New",
          url: "/dashboard/products/create",
        },
      ],
    },
    {
      title: "Skin Collection",
      url: "#",
      icon: Bot, // pick a better icon, e.g. Box or Layers
      items: [
        {
          title: "My Collection",
          url: "#",
        },
        {
          title: "Add New",
          url: "#",
        },
        {
          title: "Recommendations",
          url: "#",
        },
      ],
    },
    {
      title: "Requests",
      url: "#",
      icon: BookOpen, // pick something like Mail or ClipboardList
      items: [
        {
          title: "My Requests",
          url: "#",
        },
        {
          title: "Submit Request",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard, // Stripe-related
      items: [
        {
          title: "Billing History",
          url: "#",
        },
        {
          title: "Manage Subscription",
          url: "#",
        },
      ],
    },
  ],
  users: [
    {
      title: "User",
      url: "/dashboard/users",
      icon: User,
    },
    {
      title: "Help Center",
      url: "#",
      icon: HelpCircle,
      items: [
        {
          title: "FAQ",
          url: "#",
        },
        {
          title: "Contact Support",
          url: "#",
        },
        {
          title: "Report an Issue",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};
