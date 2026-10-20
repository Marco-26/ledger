import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export enum PeriodOptions {
  MONTH = "month",
  YEAR = "year"
}

interface DashboardActions {
  setPeriod: (period: PeriodOptions) => void;
  setSelectedDate: (date: Dayjs) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  setUploadingFileMonth: (month: string | undefined) => void;
  reset: () => void;
}

interface DashboardState {
  selectedPeriod: PeriodOptions;
  selectedDate: Dayjs;
  uploadingFileMonth?: string;
  actions: DashboardActions;
}

const initialState = () => ({
  selectedPeriod: PeriodOptions.MONTH,
  selectedDate: dayjs(),
  uploadingFileMonth: undefined,
});

const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState(),
  actions: {
    setPeriod: (newPeriod) => set({ selectedPeriod: newPeriod }),
    setSelectedDate: (newDate) => set({ selectedDate: newDate }),
    goToPrevious: () =>
      set((state) => ({
        selectedDate: state.selectedDate.subtract(1, state.selectedPeriod),
      })),
    goToNext: () =>
      set((state) => {
        const next = state.selectedDate.add(1, state.selectedPeriod);
        return { selectedDate: next.isAfter(dayjs(), "month") ? dayjs() : next };
      }),
    setUploadingFileMonth: (newUploadingMonth) =>
      set({ uploadingFileMonth: newUploadingMonth }),
    reset: () => set(initialState()),
  },
}));

export const useSelectedPeriod = () =>
  useDashboardStore((state) => state.selectedPeriod);

export const useSelectedDate = () =>
  useDashboardStore((state) => state.selectedDate);

export const useUploadingFileMonth = () =>
  useDashboardStore((state) => state.uploadingFileMonth);

export const useIsYear = () =>
  useDashboardStore((state) => state.selectedPeriod === PeriodOptions.YEAR);

export const useCanGoToNext = () =>
  useDashboardStore(
    (state) => !state.selectedDate.isSame(dayjs(), state.selectedPeriod),
  );

export const useDashboardActions = () =>
  useDashboardStore((state) => state.actions);
