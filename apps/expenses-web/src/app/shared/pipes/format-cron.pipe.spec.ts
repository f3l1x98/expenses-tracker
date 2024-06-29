import { RecurringCycle } from '../interfaces/recurring-cycle.enum';
import { FormatCronPipe } from './format-cron.pipe';

describe('FormatCronPipe', () => {
  // Pure pipe -> no need for clearing in beforeEach
  const pipe = new FormatCronPipe();

  describe('should return undefined', () => {
    it('on seconds in cron', () => {
      const cron = '0 0 2 * * 0';

      const result = pipe.transform(cron);

      expect(result).toBe(undefined);
    });
    it('on invalid cron', () => {
      const cron = 'jkansdkl asda ad';

      const result = pipe.transform(cron);

      expect(result).toBe(undefined);
    });
  });

  it('should transform weekly', () => {
    const cron = '0 2 * * 0';

    const result = pipe.transform(cron);

    expect(result).toEqual(RecurringCycle.WEEKLY);
  });

  it('should transform monthly', () => {
    const cron = '0 2 1 * *';

    const result = pipe.transform(cron);

    expect(result).toEqual(RecurringCycle.MONTHLY);
  });

  it('should transform yearly', () => {
    const cron = '0 2 1 1 *';

    const result = pipe.transform(cron);

    expect(result).toEqual(RecurringCycle.YEARLY);
  });
});
