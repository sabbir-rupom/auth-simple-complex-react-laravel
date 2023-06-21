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
      <div className="flex justify-between w-full my-4 container mx-auto px-2">
        <div className="font-bold text-xl mt-2 ml-3">{title}</div>
        <div className="pe-2 md:pe-4">
          <BreadCrumb model={items} home={icon} />
        </div>
      </div>
    </>
  );
}
