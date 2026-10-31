import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";


const API_BASE_URL =  import.meta.env.VITE_API_URL; 

export default function ReminderSendModal({ modalRef, onClose, contactId, person }) {
  const [manualReminderLoading, setManualReminderLoading] = useState(false);
  const [errorSending, setErrorSending] = useState("");
  const [messageType, setMessageType] = useState("default");
  const [customMessage, setCustomMessage] = useState("");
  const { user } = useContext(AuthContext);

  const defaultMessage =
    `Hi ${person.name},\n\nI hope you're doing well. I wanted to remind you about the pending amount of ${person.amount} Taka that you owe me. I would appreciate it if you could settle this at your earliest convenience.\n\nThank you!`;

  const message = messageType === "default" ? defaultMessage : customMessage;

  const handleClose = () => {
    setErrorSending("");
    onClose();
  };

  const handleReminderSendByEmail = async () => {
    try {
      setManualReminderLoading(true);
      const token = await user.getIdToken();
      const res = await fetch(
        `${API_BASE_URL}/api/transactions/${contactId}/send-reminder-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        },
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorSending(body.message || `Server responded with ${res.status}`);
        throw new Error(body.message || `Server responded with ${res.status}`);
      }
      const info = await res.json();
      if (!info || !info.messageId) {
        setErrorSending("Failed to send reminder email");
        throw new Error("Failed to send reminder email");
      }
      toast.success("Reminder email sent successfully!");
      console.log("Reminder email sent successfully:", info);
      handleClose();
    } catch (error) {
      console.error("Error sending reminder email:", error);
      setErrorSending(
        error.message || "An error occurred while sending the reminder email.",
      );
    } finally {
      setManualReminderLoading(false);
     
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onCancel={handleClose} >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Send email reminder?</h3>
        {errorSending && (
          <div className="alert alert-error mt-2">
            <div>{errorSending}</div>
          </div>
        )}

        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name="reminder-message"
              className="radio radio-primary mt-1"
              checked={messageType === "default"}
              onChange={() => setMessageType("default")}
            />
            <span>
              <span className="font-medium">Use default message</span>
              <span className="mt-1 block text-sm text-base-content/70">
                {defaultMessage}
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name="reminder-message"
              className="radio radio-primary mt-1"
              checked={messageType === "custom"}
              onChange={() => setMessageType("custom")}
            />
            <span className="font-medium">Write your own message</span>
          </label>

          {messageType === "custom" && (
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Type your reminder message"
              value={customMessage}
              onChange={(event) => setCustomMessage(event.target.value)}
              rows={4}
            />
          )}
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={handleClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ handleReminderSendByEmail}
            disabled={
              manualReminderLoading ||
              (messageType === "custom" && !customMessage.trim())
            }
          >
            {manualReminderLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Send reminder"
            )}
          </button>
          
        </div>
      </div>
      <div className="modal-backdrop" onClick={handleClose} />
    </dialog>
  );
}
