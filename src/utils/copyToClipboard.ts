export function copyToClipboard(text: string): void {
  const textArea = document.createElement("textarea");

  textArea.value = text;

  textArea.style.position = "fixed";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);

  textArea.select();
  textArea.setSelectionRange(0, 99999);

  document.execCommand("copy");

  document.body.removeChild(textArea);
}
