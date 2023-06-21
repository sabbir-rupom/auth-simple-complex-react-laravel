"use client";

import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";

interface BreadcrumbsProps {
  slug: string;
  labelClassName?: string;
  className?: string;
  iconClassName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  slug,
  className,
  ...rest
}) => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  if (
    pathSegments[0] === "de" ||
    pathSegments[0] === "en" ||
    pathSegments[0] === "bn"
  ) {
    pathSegments.shift();
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const urlSegments = pathSegments.slice(0, index + 1);
    const url = `/${urlSegments.join("/")}`;

    return {
      label: segment,
      url,
    };
  });

  const home = {
    icon: "pi pi-home",
    url: "/",
    // separator: false,
    visible: breadcrumbItems.length > 0 ? true : false,
  };

  return (
    <nav>
      <BreadCrumb
        model={breadcrumbItems}
        home={home}
        separatorIcon={
          breadcrumbItems.length > 0 ? "pi pi-chevron-right" : "pi pi-home"
        }
        className={className ? className : "max-w-min ml-auto"}
        {...rest}
      />
      {slug && (
        <div>
          <span>{slug}</span>
        </div>
      )}
    </nav>
  );
};

export default Breadcrumbs;
