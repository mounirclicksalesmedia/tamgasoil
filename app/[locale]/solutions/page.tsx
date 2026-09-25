// Serve the legacy address directly: older browsers may have cached the former
// permanent /services -> /solutions redirect. Reversing it creates a loop.
export { default, generateMetadata } from "../services/page";
