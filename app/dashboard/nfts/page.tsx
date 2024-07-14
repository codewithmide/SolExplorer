"use client";

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
import NFTTable from "./components/nftTable";
import { IoMdInformationCircle } from "react-icons/io";

export default function NFTs() {
  const NFTTableContent = [
    {
      name: "Honeyland",
      items: "1,515",
      price: "8,500",
      volume: "252,463.05",
      image: HoneylandImage,
      address: "3dgCCb15HMQSA4Pn3Tfii5vRk7aRqTH95LJjxzsG2Mug",
    },
    {
      name: "Mad Lads",
      items: "10,736",
      price: "76.49",
      volume: "68,399.36",
      image: MadlabsImage,
      address: "Cj2NAxiDDVvY79PLBdVQK3F3bjoHp7hvZv4kLL1vgtV3",
    },
    {
      name: "Frogana",
      items: "5,689",
      price: "2.13",
      volume: "67,428.87",
      image: FroganaImage,
      address:
        "cde1388402efb0da2ef6cff8cbd98606eb20987698d81fd86048cca8ca80e796",
    },
    {
      name: "SMB Gen2",
      items: "5,069",
      price: "30.57",
      volume: "47,957.98",
      image: SMBImage,
      address: "B2zGMNyEYquLrM3ZyX1YwpJpzAPxcihrhcevMNBB5FQX",
    },
    {
      name: "Experiment",
      items: "1,062",
      price: "0.807",
      volume: "36,534.01",
      image: ExperimentImage,
      address:
        "2a8697981072052ae363d9688ce0d097a4d78bb6b3982f17852e57b90ff2fe37",
    },
    {
      name: "Retardio Cousins",
      items: "4,474",
      price: "16.99",
      volume: "20,379.99",
      image: RetardioImage,
      address:
        "09b36de0a9862cdbfe3eb023959e97e816e17d846a5762b3c1bfe7b75490c23b",
    },
    {
      name: "Famous Fox Federation",
      items: "9,358",
      price: "4.487",
      volume: "13,751.22",
      image: FamousFoxImage,
      address:
        "7887a9bb00df7cf53080564fa55c2dc720bba44a6ee1b1b9776e6baecdba32c2",
    },
    {
      name: "STEPN",
      items: "1,010,396",
      price: "0.014",
      volume: "11,693.3",
      image: STEPNImage,
      address:
        "3979797df6672c6d19a2d56fc9d941e86da2b21e683407ce526079e5d3e0327b",
    },
    {
      name: "DeGod",
      items: "4,126",
      price: "16.9",
      volume: "9,702.73",
      image: DeGodImage,
      address:
        "abf088cf5739630ab45f28a8aff5b9af62e34a7e109f20ff074e36b222e472bc",
    },
    {
      name: "The Backwoods Hero",
      items: "7,012",
      price: "2.32",
      volume: "9,518.42",
      image: BackwoodsImage,
      address:
        "30404156c045d6c9506d5c623b3ce52999e1fdacae953abc5f74ab0c56e14d83",
    },
    {
      name: "Aquarius",
      items: "2,474",
      price: "0.986",
      volume: "9,502.05",
      image: AquariusImage,
      address:
        "090ac5c29b1848a60b70fbae2b5d0f4a211bc3cd22784eb719e71a76e6d076fe",
    },
    {
      name: "sharx",
      items: "10,140",
      price: "1.269",
      volume: "6,957.58",
      image: SharxImage,
      address:
        "366b56cd353123c79d6440193e61491b306d267a1b14e3842ce26971662c082a",
    },
    {
      name: "Magic Ticket: Normie",
      items: "17,141",
      price: "0.36997",
      volume: "6,875.69",
      image: MagicImage,
      address:
        "55eeab29000c3eaaf82ef84bd7c14b666f30193d65c1b51bd38bb437ea460ea3",
    },
    {
      name: "Claynosaurz",
      items: "10,292",
      price: "12.75",
      volume: "5,852.26",
      image: ClaynosaurzImage,
      address:
        "651fde79f01d21f5f323f53379d371bd95be959a7b0ad6440085bd614d614c1e",
    },
    {
      name: "y00t",
      items: "7,086",
      price: "4.094",
      volume: "5,347.9",
      image: y00tImage,
      address:
        "e7f22a188936b83854e5b79b3385ae6cf842cd7d264523e4a47b29216e7db635",
    },
  ];

  return (
    <DashboardLayout path="NFTs">
      <Card>
        <div className="flex gap-2 items-center bg-whiteBg dark:bg-darkBg w-full">
          <h3 className="text-xl pl-5 py-5 leading-[25px] font-semibold">
            NFTs Overview
          </h3>
          <div className="tooltip my-auto">
            <IoMdInformationCircle size={24} className="text-start" />
            <span className="tooltiptext-2">
              NFTs are listed in no particular order, also nft details are currently static
            </span>
          </div>
        </div>

        <div className="px-6 py-6 center w-full flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928]">
          <div className="w-full border flex-col p-6 gap-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
            <NFTTable data={NFTTableContent} />
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
