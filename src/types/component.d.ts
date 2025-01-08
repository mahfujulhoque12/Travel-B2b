import { BookingDataType } from "@/hooks/useFetchData";
interface ActionButtonType {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}
export interface BookingPropsType {
  data: BookingDataType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  actionButton: ActionButtonType[];
}
