import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useBloglistStore = create(set => ({}));
const useNotificationStore = create((set, get) => {
  let timer;
  return {
    notification: null,
    type: null,
    actions: {
      displayErrorNotification: message => {
        clearTimeout(timer);
        set(() => ({ notification: message, type: "error" }));
        timer = setTimeout(() => get().actions.clearNotification(), 5000);
      },
      displaySuccessNotification: message => {
        clearTimeout(timer);
        set(() => ({ notification: message, type: "success" }));
        timer = setTimeout(() => get().actions.clearNotification(), 5000);
      },

      clearNotification: () => set({ notification: null, type: null }),
    },
  };
});

export const useNotifications = () =>
  useNotificationStore(
    useShallow(state => ({
      notification: state.notification,
      type: state.type,
    })),
  );
export const useNotificationsActions = () =>
  useNotificationStore(state => state.actions);
