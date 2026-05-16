'use client';

import { useState, useEffect } from 'react';
import Footer from "./components/Footer";
import React from "react";
import Navbar from "../components/Navbar";

type FileType = "pdf" | "docx" | "xlsx";
type Category = "Official" | "Minutes" | "Finance" | "Committees" | "Templates";

interface Document {
  id: number;
  title: string;
  description: string;
  fileType: FileType;
  category: Category;
  date: string;
  action: "View" | "Download";
  accent?: boolean;
}


const documents: Document[] = [
  {
    id: 1,
    title: "Statutes Updated 2024 Version",
    description: "The fundamental governing document outlining association structure and protocols.",
    fileType: "pdf",
    category: "Official",
    date: "Oct 12, 2023",
    action: "View",
  },
  {
    id: 2,
    title: "General Assembly Minutes – Sept",
    description: "Recorded proceedings and voting results from the first monthly assembly.",
    fileType: "docx",
    category: "Minutes",
    date: "Sep 28, 2023",
    action: "Download",
    accent: true,
  },
  {
    id: 3,
    title: "Budget Plan Spring 26",
    description: "Detailed breakdown of committee funds and upcoming event expenses.",
    fileType: "xlsx",
    category: "Finance",
    date: "Oct 05, 2023",
    action: "Download",
  },
  {
    id: 4,
    title: "Policy Manual 2025 Oct Updated",
    description: "Interpretations for States, not legally bindings.",
    fileType: "pdf",
    category: "Official",
    date: "Aug 15, 2023",
    action: "View",
  },
  {
    id: 5,
    title: "Membership Form Template",
    description: "Standardized form for new student association applicants.",
    fileType: "docx",
    category: "Templates",
    date: "Jul 12, 2023",
    action: "Download",
  },
];


const fileIcons: Record<FileType, { icon: string; bg: string; text: string }> = {
  pdf:  { icon: "picture_as_pdf", bg: "bg-red-100",   text: "text-red-600"   },
  docx: { icon: "description",    bg: "bg-blue-100",  text: "text-blue-600"  },
  xlsx: { icon: "table_chart",    bg: "bg-green-100", text: "text-green-600" },
};
 
const tags = ["2024 Semester", "Official", "Templates", "Archive"];


function DocumentCard({ doc }: { doc: Document }) {
  const fi = fileIcons[doc.fileType];
 
  return (
    <article
      className="bg-white p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Icon row */}
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 ${fi.bg} rounded-2xl flex items-center justify-center ${fi.text}`}>
          <span className="material-symbols-outlined text-3xl">{fi.icon}</span>
        </div>
        <button className="text-[#001c3da1] hover:text-[#865400] transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
 
      {/* Content */}
      <h3 className="text-xl font-bold text-[#001c3d] mb-2 group-hover:text-[#001c3da1] transition-colors">
        {doc.title}
      </h3>
      <p className="text-[#001c3da1] text-sm mb-6">{doc.description}</p>
 
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-[#f9e9d5] px-3 py-1 rounded-md text-[10px] font-bold text-[#001c3d] uppercase tracking-widest">
          {doc.category}
        </span>
        <span className="bg-[#f9e9d5] px-3 py-1 rounded-md text-[10px] font-bold text-[#001c3d] uppercase tracking-widest">
          {doc.fileType.toUpperCase()}
        </span>
      </div>
 
      {/* Footer row */}
      <div className="flex items-center justify-between pt-6 border-t border-[#d5fcf0]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#001c3da1] text-lg">calendar_today</span>
          <span className="text-xs text-[#001c3da1] font-medium">{doc.date}</span>
        </div>
        <a
          href="#"
          className="text-[#001c3d] font-bold text-sm flex items-center gap-1 hover:underline"
        >
          {doc.action}
          <span className="material-symbols-outlined text-sm">
            {doc.action === "View" ? "open_in_new" : "download"}
          </span>
        </a>
      </div>
    </article>
  );
}
 
function ArchivistCard() {
  return (
    <article className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-end p-8 bg-[rgba(255,255,255,0.5)]">
      {/* Background texture via gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#a6f2d1] via-transparent to-[#003a30]" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Can&apos;t find a file?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-xs">
          Request archived documents to a secretary.
        </p>
        <button className="px-6 py-2 bg-[#4f3000] text-[#fea619] rounded-full text-sm font-bold border border-[#fea619]/30 hover:bg-[#6b4000] transition-colors">
          Contact secretary
        </button>
      </div>
    </article>
  );
}
 
// ─── Page ─────────────────────────────────────────────────────────────────────
 
export default function Documents() {
  const [search, setSearch] = useState("");
  const [fileFilter, setFileFilter] = useState("All File Types");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const filtered = documents.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchFile =
      fileFilter === "All File Types" ||
      (fileFilter === "PDF Documents" && d.fileType === "pdf") ||
      (fileFilter === "DOCX Files" && d.fileType === "docx") ||
      (fileFilter === "Spreadsheets" && d.fileType === "xlsx");
    const matchCat =
      catFilter === "All Categories" || d.category === catFilter;
    const matchTag =
      !activeTag ||
      d.category.toLowerCase() === activeTag.toLowerCase() ||
      d.date.includes("2024") && activeTag === "2024 Semester" ||
      d.category === "Templates" && activeTag === "Templates" ||
      activeTag === "Archive";
    return matchSearch && matchFile && matchCat && matchTag;
  });
 
  return (
    <main className="bg-[#001c3da1] min-h-screen">
      {/* ── Navbar ── */}
      <Navbar />
 
      {/* ── Main content ── */}
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
 
        {/* Header */}
        <header className="mb-16 md:flex items-end justify-between">
          <div className="max-w-2xl">
            <h4 className="text-5xl md:text-6xl text-[#FFF8F0] mb-6 font-bold">
              Document Portal
            </h4>
            <p className="text-[#FFF8F0] text-lg leading-relaxed">
              The all UCMSA related documents (minutes, templates, budget plan) will be stored here. 
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="bg-[rgba(255,255,255,0.5)] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#1c6b51]/20 active:scale-95 transition-transform hover:opacity-90">
              <span className="material-symbols-outlined">upload_file</span>
              Upload New
            </button>
          </div>
        </header>
 
        {/* Search & Filter Bar */}
        <section className="mb-12 sticky top-[4.25rem] md:top-[calc(2vw+3rem)] z-40">
          <div className={`bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-3xl shadow-sm transition-all duration-300 ${isScrolled ? "p-3 space-y-2" : "p-4 sm:p-6 space-y-4 sm:space-y-6"}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search */}
              <div className="lg:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#001c3da1]">
                  search
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001c3da1]/20 placeholder:text-[#001c3da1] text-[#001c3da1] transition-all duration-300 ${isScrolled ? "py-2 text-sm" : "py-3 sm:py-4"}`}
                  placeholder="Search documents..."
                  type="text"
                />
              </div>
 
              {/* File type */}
              <div className="lg:col-span-2">
                <select
                  value={fileFilter}
                  onChange={(e) => setFileFilter(e.target.value)}
                  className={`w-full px-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c6b51]/20 text-[#2e695c] appearance-none transition-all duration-300 ${isScrolled ? "py-2 text-sm" : "py-3 sm:py-4"}`}
                >
                  <option>All File Types</option>
                  <option>PDF Documents</option>
                  <option>DOCX Files</option>
                  <option>Spreadsheets</option>
                </select>
              </div>
 
              {/* Category */}
              <div className="lg:col-span-2">
                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                  className={`w-full px-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c6b51]/20 text-[#2e695c] appearance-none transition-all duration-300 ${isScrolled ? "py-2 text-sm" : "py-3 sm:py-4"}`}
                >
                  <option>All Categories</option>
                  <option>Bylaws</option>
                  <option>Minutes</option>
                  <option>Finance</option>
                  <option>Academic</option>
                </select>
              </div>
 
              {/* Filter button */}
              <div className="lg:col-span-2 flex gap-2">
                <button
                  onClick={() => { setSearch(""); setFileFilter("All File Types"); setCatFilter("All Categories"); setActiveTag(null); }}
                  className={`flex-1 bg-[#001c3da1] text-[#FFF8F0] font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#1c6b51]/10 ${isScrolled ? "py-2 text-sm" : "py-3 sm:py-4"}`}
                >
                  <span className="material-symbols-outlined">filter_list</span>
                  Reset
                </button>
              </div>
            </div>
 
            {/* Popular Tags */}
            <div className={`flex flex-wrap gap-2 items-center transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-20 opacity-100"}`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFF8F0] px-2">
                Popular Tags:
              </span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={[
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors",
                    activeTag === tag
                      ? "bg-[#1c6b51] text-white"
                      : "bg-[#c9d3ff] text-[#1d3989] hover:bg-[#dce1ff]",
                  ].join(" ")}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
 
        {/* Document Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
          {/* Archivist feature card always shown */}
          <ArchivistCard />
        </section>
 
        {/* Load More */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-px w-24 bg-[#4c8577]/20 mb-8" />
          <button className="group flex items-center gap-4 text-[#FFF8F0] font-bold tracking-tight">
            <span className="text-sm">DISCOVER MORE DOCUMENTS</span>
            <span className="w-12 h-12 bg-[rgba(255,255,255,0.5)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">arrow_downward</span>
            </span>
          </button>
        </div>
      </div>
 
      {/* ── Footer ── */}
      <Footer />
 
    </main>
  );
}