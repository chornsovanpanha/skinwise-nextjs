import { Typography } from "@/components/Typography";

const ContactInfo = () => {
  return (
    <div>
      <Typography variant="body1" as="p" className="text-md border-t-1 pt-4">
        Need help ?
      </Typography>

      <ul className="pt-4 space-y-1 text-left">
        <li>
          <Typography variant="body1" as="p" className="text-sm">
            Address: Phnom Penh, Cambodia
          </Typography>
        </li>
        <li>
          <Typography variant="body1" as="p" className="text-sm">
            Email:{" "}
            <a href="mailto:skinwise@example.com" className="underline">
              info@skinwise.com
            </a>
          </Typography>
        </li>
        <li>
          <Typography variant="body1" as="p" className="text-sm">
            Phone:{" "}
            <a href="tel:+855965689894" className="underline">
              +855 96 56 89894
            </a>
          </Typography>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
