import {
  Mail,
  Lock,
  Loader,
  User,
  X,
  Bell,
  BellRing,
  CalendarDays,
  UserRoundX,
  UserPlus,
  CloudUpload,
  Download,
  ArrowLeft,
  ArrowRight,
  Search,
  BadgePlus,
  BriefcaseBusiness,
  ChevronRight,
  History,
  Info,
  Landmark,
  LocateFixed,
  NotebookTabs,
  ExternalLinkIcon,
  Pencil,
  CalendarIcon,
  EllipsisVertical,
  ChevronDown,
} from "lucide-react"; // Example Lucide icons

export const Icons = {
  mail: (props: { size?: number }) => <Mail {...props} />,
  lock: (props: { size?: number }) => <Lock {...props} />,
  loader: (props: { size?: number }) => <Loader {...props} />,
  user: (props: { size?: number }) => <User {...props} />,
  close: (props: { size?: number }) => <X {...props} />,
  bell: (props: { size?: number }) => <Bell {...props} />,
  bellRing: (props: { size?: number }) => <BellRing {...props} />,
  calendarDays: (props: { size?: number }) => <CalendarDays {...props} />,
  calendarIcon: (props: { size?: number }) => <CalendarIcon {...props} />,
  userRoundX: (props: { size?: number }) => <UserRoundX {...props} />,
  userPlus: (props: { size?: number }) => <UserPlus {...props} />,
  cloudUpload: (props: { size?: number }) => <CloudUpload {...props} />,
  download: (props: { size?: number }) => <Download {...props} />,
  arrowLeft: (props: { size?: number }) => <ArrowLeft {...props} />,
  arrowRight: (props: { size?: number }) => <ArrowRight {...props} />,
  search: (props: { size?: number }) => <Search {...props} />,
  badgePlus: (props: { size?: number }) => <BadgePlus {...props} />,
  briefcaseBusiness: (props: { size?: number }) => (
    <BriefcaseBusiness {...props} />
  ),
  chevronRight: (props: { size?: number }) => <ChevronRight {...props} />,
  chevronDown: (props: { size?: number }) => <ChevronDown {...props} />,
  history: (props: { size?: number }) => <History {...props} />,
  info: (props: { size?: number }) => <Info {...props} />,
  landmark: (props: { size?: number }) => <Landmark {...props} />,
  locateFixed: (props: { size?: number }) => <LocateFixed {...props} />,
  notebookTabs: (props: { size?: number }) => <NotebookTabs {...props} />,
  externalLinkIcon: (props: { size?: number }) => (
    <ExternalLinkIcon {...props} />
  ),
  pencil: (props: { size?: number }) => <Pencil {...props} />,
  ellipsisVertical: (props: { size?: number }) => (
    <EllipsisVertical {...props} />
  ),
  

  // Add more icons as needed
};

export type IconName = keyof typeof Icons; // This defines the type for icon names
