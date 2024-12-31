import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

/**
 * Bildirim mesajlarını gösteren bileşen.
 *
 * @param {Array|Object|string} messages - Bildirim mesajları listesi veya tek bir bildirim mesajı
 * @returns {JSX.Element} - Bildirim bileşeni
 */

const ToastAlert = ({ messages }) => {
  const { t } = useTranslation();
  const toast = useRef(null);
  useEffect(() => {
    toast.current.clear();
    if (messages) {
      show();
    }
  }, [messages]);

  const toastViewTemplate = (type, summary, detail) => {
    toast.current.show({
      severity: type,
      summary: t(summary),
      detail: t(detail),
      life: 5000
    });
  };

  const show = () => {
    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        toastViewTemplate(message.type, message.summary, message.detail);
      });
    }
  };

  return <Toast ref={toast} />;
};

export default ToastAlert;
