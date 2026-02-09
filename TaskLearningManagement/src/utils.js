export function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;

  const toast = document.createElement("div");

  const colors = {
    success: "border-green-500 bg-green-50 text-green-700",
    error: "border-red-500 bg-red-50 text-red-700",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-700"
  };

  toast.className = `
    flex items-center gap-3 border-l-4 p-4 rounded-lg shadow-lg
    min-w-[260px] animate-fade-in ${colors[type]}
  `;

  toast.innerHTML = `
    <span class="font-medium">${message}</span>
    <button class="ml-auto font-bold">×</button>
  `;

  toast.querySelector("button").onclick = () => toast.remove();

  root.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
