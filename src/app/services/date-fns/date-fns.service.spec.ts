import { DateFnsService } from './date-fns.service';

fdescribe('DateFnsService', () => {
  let service: DateFnsService;

  service = new DateFnsService();

  it('should return formatted date', () => {
    expect(service.formatDate(new Date('2022,02,02'), 'dd,MM,yyyy')).toBe(
      '02,02,2022'
    );
  });

  it('should return distance between dates from current date', () => {
    const currentDate = new Date();
    const dayInMilliseconds = 86400000;
    const lastDay = currentDate.getTime() - dayInMilliseconds;
    const formatLastDay = service.formatDate(new Date(lastDay), 'yyyy,MM,dd');

    expect(
      service.getDistanceBetweenDatesFromCurrentDate(formatLastDay, 'day')
    ).toBe(1);
  });

  it('should return distance between dates from next sunday', () => {
    const weekInMilliseconds = 604800000;
    const nextSunday = new Date(service.formattedNextSunday);
    const lastSunday = nextSunday.getTime() - weekInMilliseconds;
    const formattedLastSunday = service.formatDate(
      new Date(lastSunday),
      'yyyy,MM,dd'
    );

    expect(
      service.getDistanceBetweenDatesFromNextSunday(formattedLastSunday, 'day')
    ).toBe(7);
  });
});
