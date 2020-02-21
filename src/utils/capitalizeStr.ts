export default function capitalizeStr(str: string): string {
  return str.replace(/^./, match => match.toUpperCase());
}
