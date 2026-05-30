import type {
  HeaderCollectionItem,
  HeaderNavItem,
} from "./header.types";

export const navItems: HeaderNavItem[] = [
  {
    label: "Parfums",
    href: "/pc/collection/parfums",
  },
  {
    label: "Nouveautés",
    href: "/pc/collection/nouveautes",
  },
  {
    label: "Maison",
    href: "/pc",
  },
];

export const collectionItems: HeaderCollectionItem[] =
  [
    {
      label: "Collection 01",
      title: "Signatures",
      href: "/pc/collection/parfums",
      text: "Les sillages essentiels de la maison.",
    },
    {
      label: "Rituel",
      title: "Intimes",
      href: "/pc/collection/intimes",
      text: "Des accords plus proches de la peau.",
    },
    {
      label: "Archive",
      title: "Éditions limitées",
      href: "/pc/collection/editions-limitees",
      text: "Des compositions rares, pensées en silence.",
    },
  ];