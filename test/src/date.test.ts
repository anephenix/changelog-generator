// Dependencies
import assert from 'assert';
import { getOrdinalSuffix, formatDateToString } from '../../src/date';

describe('Date', () => {
  describe('#getOrdinalSuffix', () => {
    it('should return the appropriate suffix for a given date', () => {
      const scenarios = [
        { day: 1, expected: 'st' },
        { day: 2, expected: 'nd' },
        { day: 3, expected: 'rd' },
        { day: 4, expected: 'th' },
        { day: 5, expected: 'th' },
        { day: 6, expected: 'th' },
        { day: 7, expected: 'th' },
        { day: 8, expected: 'th' },
        { day: 9, expected: 'th' },
        { day: 10, expected: 'th' },
        { day: 11, expected: 'th' },
        { day: 12, expected: 'th' },
        { day: 13, expected: 'th' },
        { day: 14, expected: 'th' },
        { day: 15, expected: 'th' },
        { day: 16, expected: 'th' },
        { day: 17, expected: 'th' },
        { day: 18, expected: 'th' },
        { day: 19, expected: 'th' },
        { day: 20, expected: 'th' },
        { day: 21, expected: 'st' },
        { day: 22, expected: 'nd' },
        { day: 23, expected: 'rd' },
        { day: 24, expected: 'th' },
        { day: 25, expected: 'th' },
        { day: 26, expected: 'th' },
        { day: 27, expected: 'th' },
        { day: 28, expected: 'th' },
        { day: 29, expected: 'th' },
        { day: 30, expected: 'th' },
        { day: 31, expected: 'st' },
      ];
      scenarios.forEach(({ day, expected }) => {
        assert.equal(getOrdinalSuffix(day), expected);
      });
    });
  });

  describe('#formatDateToString', () => {
    it('should return the current date in the correct format', () => {
      const scenarios = [
        { date: new Date('2021-01-01'), expected: 'Friday 1st January, 2021' },
        {
          date: new Date('2021-02-02'),
          expected: 'Tuesday 2nd February, 2021',
        },
        { date: new Date('2021-03-03'), expected: 'Wednesday 3rd March, 2021' },
        { date: new Date('2021-04-04'), expected: 'Sunday 4th April, 2021' },
        { date: new Date('2021-05-05'), expected: 'Wednesday 5th May, 2021' },
        { date: new Date('2021-06-06'), expected: 'Sunday 6th June, 2021' },
        { date: new Date('2021-07-07'), expected: 'Wednesday 7th July, 2021' },
        { date: new Date('2021-08-08'), expected: 'Sunday 8th August, 2021' },
        {
          date: new Date('2021-09-09'),
          expected: 'Thursday 9th September, 2021',
        },
        { date: new Date('2021-10-10'), expected: 'Sunday 10th October, 2021' },
        {
          date: new Date('2021-11-11'),
          expected: 'Thursday 11th November, 2021',
        },
        {
          date: new Date('2021-12-12'),
          expected: 'Sunday 12th December, 2021',
        },
      ];
      scenarios.forEach(({ date, expected }) => {
        const originalDate = Date;
        global.Date = class extends Date {
          constructor() {
            super();
            return date;
          }
        } as any;
        assert.equal(formatDateToString(), expected);
        global.Date = originalDate;
      });
    });
  });
});
