"use client"

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";
import HoneylandImage from "@/public/icons/honeyland.webp";
import MadlabsImage from "@/public/icons/madlabs.webp";
import FroganaImage from "@/public/icons/frogana.webp";
import SMBImage from "@/public/icons/SMBGen2.webp";
import ExperimentImage from "@/public/icons/Experiment.webp";
import RetardioImage from "@/public/icons/RetardioCousins.webp";
import FamousFoxImage from "@/public/icons/FamousFoxFederation.webp";
import STEPNImage from "@/public/icons/STEPN.webp";
import DeGodImage from "@/public/icons/DeGod.webp";
import BackwoodsImage from "@/public/icons/TheBackwoodsHero.webp";
import AquariusImage from "@/public/icons/Aquarius.webp";
import SharxImage from "@/public/icons/sharx.webp";
import MagicImage from "@/public/icons/MagicTicket.webp";
import ClaynosaurzImage from "@/public/icons/Claynosaurz.webp";
import y00tImage from "@/public/icons/y00t.webp";

export default function Defi() {
  const NFTTable = [
    {
      name: "Honeyland",
      items: "1,515",
      price: "8,500",
      volume: "252,463.05",
      image: HoneylandImage
    },
    {
      name: "Mad Lads",
      items: "10,736",
      price: "76.49",
      volume: "68,399.36",
      image: MadlabsImage
    },
    {
      name: "Frogana",
      items: "5,689",
      price: "2.13",
      volume: "67,428.87",
      image: FroganaImage
    },
    {
      name: "SMB Gen2",
      items: "5,069",
      price: "30.57",
      volume: "47,957.98",
      image: SMBImage,
    },
    {
      name: "Experiment",
      items: "1,062",
      price: "0.807",
      volume: "36,534.01",
      image: ExperimentImage
    },
    {
      name: "Retardio Cousins",
      items: "4,474",
      price: "16.99",
      volume: "20,379.99",
      image: RetardioImage
    },
    {
      name: "Famous Fox Federation",
      items: "9,358",
      price: "4.487",
      volume: "13,751.22",
      image: FamousFoxImage
    },
    {
      name: "STEPN",
      items: "1,010,396",
      price: "0.014",
      volume: "11,693.3",
      image: STEPNImage
    },
    {
      name: "DeGod",
      items: "4,126",
      price: "16.9",
      volume: "9,702.73",
      image: DeGodImage
    },
    {
      name: "The Backwoods Hero",
      items: "7,012",
      price: "2.32",
      volume: "9,518.42",
      image: BackwoodsImage
    },
    {
      name: "Aquarius",
      items: "2,474",
      price: "0.986",
      volume: "9,502.05",
      image: AquariusImage
    },
    {
      name: "sharx",
      items: "10,140",
      price: "1.269",
      volume: "6,957.58",
      image: SharxImage
    },
    {
      name: "Magic Ticket: Normie",
      items: "17,141",
      price: "0.36997",
      volume: "6,875.69",
      image: MagicImage
    },
    {
      name: "Claynosaurz",
      items: "10,292",
      price: "12.75",
      volume: "5,852.26",
      image: ClaynosaurzImage
    },
    {
      name: "y00t",
      items: "7,086",
      price: "4.094",
      volume: "5,347.9",
      image: y00tImage
    },
  ]
  return (
    <DashboardLayout path="NFTs">
      <Card>Hello</Card>
    </DashboardLayout>
  );
}
