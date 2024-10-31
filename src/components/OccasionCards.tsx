import { FocusCards } from "@/components/ui/focus-cards";
import BirthdayImage from "@/public/images/birthday.jpeg";
import DateImage from "@/public/images/date.jpeg";
import HousePartyImage from "@/public/images/house-party.jpeg";

export function OccasionCards() {
  const cards = [
    {
      title: "Birthday Party",
      src: BirthdayImage,
      textColor: "#ec4899",
      id: 'birthday'
    },
    {
      title: "Valentine's Day",
      src: DateImage,
      textColor: "#e11d48",
      id: 'date'
    },
    {
      title: "House party",
      src: HousePartyImage,
      textColor: "#facc15",
      id: 'houseparty'
    },
   
  ];

  return <FocusCards cards={cards} />;
}
