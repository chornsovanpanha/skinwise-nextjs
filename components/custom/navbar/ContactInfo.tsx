import { Typography } from "@/components/Typography";
import Link from "next/link";

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
            <Link
              target="_blank"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=amyjohn922@gmail.com&su=Hello%20Skinwise&body=I%20would%20like%20more%20information."
              className="underline"
            >
              info@skinwise.com
            </Link>
          </Typography>
        </li>
        <li>
          <Typography variant="body1" as="p" className="text-sm">
            Phone:{" "}
            <a href="tel:+85512321472" className="underline">
              +855 12 32 1472
            </a>
          </Typography>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
