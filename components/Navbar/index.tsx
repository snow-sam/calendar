import { Root } from "@/components/Navbar/Root";
import { Title } from "@/components/Navbar/Title";
import { Options } from "@/components/Navbar/Options";
import { Option } from "@/components/Navbar/Option";

import { eachDayOfInterval, startOfWeek, endOfWeek, format, isSameDay } from 'date-fns';
import { FMT_TITLE_DATE, FMT_WEEK_DATE, FMT_DAY_DATE } from '@/app/constants';


type StandartNavbarProps = {
  date: Date,
  changeDay: React.Dispatch<React.SetStateAction<Date>>,
  hasTodos: (date: Date) => boolean
}

const StandartNavbar = ({ date, changeDay, hasTodos }: StandartNavbarProps) => {
  const [start, end] = [startOfWeek(date), endOfWeek(date)]
  const days = eachDayOfInterval({ start, end })

  return (
    <Root>
      <Title onClick={() => changeDay(new Date())}>{format(date, FMT_TITLE_DATE)}</Title>
      <Options>
        {days.map((day) => (
          <Option
            className={`relative ${isSameDay(day, date) ? 'font-bold' : 'opacity-50'}`}
            onClick={() => changeDay(day)}
            key={day.getDay()}>
            <span>{format(day, FMT_WEEK_DATE)}</span>
            <br />
            <span>{format(day, FMT_DAY_DATE)}</span>
            {hasTodos(day) && <span className='absolute top-0 right-0 translate-x-2 size-1.5 rounded-full bg-orange-500' />}
          </Option>
        ))}
      </Options>
    </Root>
  )
}

export default StandartNavbar