import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="px-3 py-2">
      <div className="flex bg-slate-800/60 rounded-full p-1">
        {/* Chats */}
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 text-sm font-medium py-2 rounded-full transition-all duration-300
            ${
              activeTab === "chats"
                ? "bg-cyan-500/20 text-cyan-400 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
        >
          Chats
        </button>

        {/* Contacts */}
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 text-sm font-medium py-2 rounded-full transition-all duration-300
            ${
              activeTab === "contacts"
                ? "bg-cyan-500/20 text-cyan-400 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;