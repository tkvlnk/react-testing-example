export default function capitalizeStr(input: string): string {
  return input.replace(/^./, match => match.toUpperCase());
}
