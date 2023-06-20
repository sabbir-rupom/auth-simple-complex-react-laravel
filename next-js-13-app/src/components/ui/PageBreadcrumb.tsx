"use client"

import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

interface ItemType {
  label: string;
  url?: string;
  className?: string;
}
type Props = {
  items: ItemType[];
  icon?: any;
  title: string;
};
export default function PageBreadcrumb({ items, icon = false, title }: Props) {
  // const items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
  // const home = { icon: 'pi pi-home', url: 'https://primereact.org' };

  return (
    <>
      <div className="tw-flex tw-justify-between tw-w-full tw-my-4 tw-container tw-mx-auto px-2">
        <div className="tw-font-bold tw-text-xl tw-mt-2 tw-ml-3">{title}</div>
        <div className="tw-pe-2 md:tw-pe-4">
          <BreadCrumb model={items} home={icon} />
        </div>
      </div>
    </>
  );
}
