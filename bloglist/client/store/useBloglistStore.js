import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import blogService from "../services/blog";
import loginService from "../services/login";
import userService from "../services/user";

const useBloglistStore = create(set => ({
  blogs: [],
  users: [],
  actions: {
    initialize: async () => {
      const users = await userService.getAll();
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      set(() => ({ blogs: sortedBlogs, users: users }));
    },
    addBlog: async newBlog => {
      const createdBlog = await blogService.create(newBlog);
      set(state => ({ blogs: state.blogs.concat(createdBlog) }));
    },
    voteBlog: async blogId => {
      const updatedBlog = await blogService.vote(blogId);
      set(state => ({
        blogs: state.blogs
          .map(b => (b.id === updatedBlog.id ? updatedBlog : b))
          .sort((a, b) => b.likes - a.likes),
      }));
    },
    removeBlog: async blogId => {
      await blogService.remove(blogId);
      set(state => ({
        blogs: state.blogs.filter(b => b.id !== blogId),
      }));
    },
  },
}));

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

const useUserStore = create(
  persist(
    set => ({
      user: null,
      actions: {
        login: async credentials => {
          const user = await loginService.login(credentials);
          blogService.setToken(user.token);
          set({ user });
        },
        logout: () => set({ user: null }),
      },
    }),
    {
      name: "user",
      partialize: state => ({ user: state.user }),
    },
  ),
);

export const useBlogs = () => useBloglistStore(state => state.blogs);
export const useUsers = () => useBloglistStore(state => state.users);

export const useBlogsActions = () => useBloglistStore(state => state.actions);

export const useNotifications = () =>
  useNotificationStore(
    useShallow(state => ({
      notification: state.notification,
      type: state.type,
    })),
  );
export const useNotificationsActions = () =>
  useNotificationStore(state => state.actions);

export const useUser = () => useUserStore(state => state.user);

export const useUserActions = () => useUserStore(state => state.actions);
