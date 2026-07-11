const fs = require('fs');
const file = 'f:/full stack project/ScholarStack/scholar-stack/src/app/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('{/* ==========================================');
const endIndexStr = '</AnimatePresence>'; // Wait, AnimatePresence was removed!
// Let's find the closing tags.
// The modal block ends with:
//         )}
//     </>
//   );
// }

// Let's find the exact string to start replacing from.
const startReplaceStr = `{/* ==========================================
          ADD COURSE DIALOG / MODAL (FOR TEACHERS)
          ========================================== */}`;
const endReplaceStr = `        )}
    </>
  );
}`;

const startPos = content.indexOf(startReplaceStr);
const endPos = content.indexOf(endReplaceStr);

if (startPos === -1 || endPos === -1) {
  console.log("Could not find boundaries");
  process.exit(1);
}

const replacement = `{/* ==========================================
          ADD COURSE DIALOG / MODAL (FOR TEACHERS)
          ========================================== */}
        {isAddCourseOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
              onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
              className="absolute inset-0 bg-[#070814] flex items-center justify-center overflow-hidden"
            >
              {/* Colorful blobs for glassmorphism effect */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/40 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/40 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Modal Body */}
            <div
              className="relative w-full max-w-3xl rounded-[2rem] border border-white/40 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-[#6b52a3] to-[#8a6ec7] relative z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#23154d] border border-white/10 flex items-center justify-center shadow-inner">
                    <Sparkles className="h-6 w-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-white tracking-wide">
                      Create New Course
                    </h3>
                    <p className="text-sm text-purple-100 font-light mt-1">Fill out the details to launch your course</p>
                  </div>
                </div>
                <button
                  onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-8 overflow-y-auto relative z-10">
                {/* Status alerts */}
                {modalSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-700 text-sm shadow-sm mb-6">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">Course created successfully!</span>
                  </div>
                )}

                {modalError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-700 text-sm shadow-sm mb-6">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">{modalError}</span>
                  </div>
                )}

                <form id="create-course-form" onSubmit={handleCreateCourse} className="space-y-6">
                  {/* Title & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Course Title</label>
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          placeholder="e.g. Master React in 30 Days"
                          className="w-full bg-white/50 border-2 border-blue-200/60 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all placeholder:text-slate-500 text-slate-800 shadow-[inset_0_2px_10px_rgba(59,130,246,0.1)] backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Category</label>
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 z-10 p-1.5 bg-teal-500 rounded-lg">
                          <BookMarked className="h-4 w-4 text-white" />
                        </div>
                        <select
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value)}
                          className="w-full bg-white/50 border-2 border-teal-200/60 rounded-2xl pl-14 pr-10 py-4 text-sm focus:outline-none focus:border-teal-400 focus:bg-white/80 transition-all appearance-none cursor-pointer text-slate-800 shadow-[inset_0_2px_10px_rgba(20,184,166,0.1)] backdrop-blur-sm"
                        >
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Business">Business</option>
                          <option value="Science">Science</option>
                          <option value="Mathematics">Mathematics</option>
                        </select>
                        <ChevronRight className="absolute right-4 h-5 w-5 text-teal-600 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={courseDesc}
                      onChange={(e) => setCourseDesc(e.target.value)}
                      placeholder="Write a compelling overview of what students will learn..."
                      className="w-full bg-white/50 border-2 border-pink-200/60 rounded-2xl p-5 text-sm focus:outline-none focus:border-pink-400 focus:bg-white/80 transition-all resize-none placeholder:text-slate-500 text-slate-800 shadow-[inset_0_2px_10px_rgba(236,72,153,0.1)] backdrop-blur-sm"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Price</label>
                    <div className="relative group max-w-[240px]">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="h-7 w-7 rounded-full bg-orange-200 flex items-center justify-center">
                          <span className="text-orange-700 font-bold text-sm">$</span>
                        </div>
                      </div>
                      <input
                        type="number"
                        required
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                        placeholder="e.g. 99"
                        className="w-full bg-orange-50/50 border-2 border-orange-200/60 rounded-2xl pl-14 pr-4 py-4 text-sm focus:outline-none focus:border-orange-400 focus:bg-orange-50/80 transition-all placeholder:text-slate-500 font-semibold text-slate-800 shadow-[inset_0_2px_10px_rgba(249,115,22,0.1)] backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Course Image Upload */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
                      Course Cover Image
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200/50 text-slate-600 normal-case border border-slate-300/50">16:9 Recommended</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCourseImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {courseImage ? (
                      <div className="relative rounded-3xl overflow-hidden border border-white/40 h-36 group shadow-lg bg-black/10">
                        <img src={courseImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/20 hover:bg-white/30 border border-white/30 px-5 py-2.5 rounded-xl text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
                          >
                            <Upload className="h-4 w-4" /> Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImg}
                        className={\`w-full flex flex-col items-center justify-center p-6 rounded-3xl transition-all cursor-pointer min-h-[140px] relative overflow-hidden group shadow-md \${
                          isUploadingImg ? "opacity-70 cursor-wait" : "hover:shadow-xl hover:scale-[1.01]"
                        }\`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c] via-[#4a004a] to-[#003b5c] opacity-90" />
                        <div className="absolute inset-0 bg-black/10" />
                        
                        <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                          {isUploadingImg ? (
                            <>
                              <div className="relative">
                                <div className="h-10 w-10 rounded-xl border-2 border-white/20" />
                                <div className="absolute inset-0 h-10 w-10 rounded-xl border-2 border-white border-t-transparent animate-spin" />
                                <Upload className="absolute inset-0 m-auto h-4 w-4 text-white animate-pulse" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-white drop-shadow-md">Uploading to cloud...</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 mb-1 drop-shadow-md text-white/90 group-hover:text-white transition-colors" />
                              <p className="text-base font-bold drop-shadow-md group-hover:text-white transition-colors">Click to upload cover image</p>
                              <p className="text-xs text-white/80 drop-shadow-md">PNG, JPG or WEBP (Max 5MB)</p>
                            </>
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer / Actions */}
              <div className="px-8 py-6 shrink-0 flex items-center justify-end gap-6 z-10 relative">
                <button
                  type="button"
                  disabled={isCreatingCourse || isUploadingImg}
                  onClick={() => setIsAddCourseOpen(false)}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer underline underline-offset-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-course-form"
                  disabled={isCreatingCourse || isUploadingImg || !courseTitle || !courseDesc || !coursePrice || !courseImage}
                  className="group relative flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[#3f2b70] hover:bg-[#2a1d4a] text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer overflow-hidden border border-[#5c40a6]"
                >
                  <div className="relative z-10 flex items-center gap-2 transition-colors">
                    {isCreatingCourse ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>PUBLISH COURSE</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}`;

const newContent = content.substring(0, startPos) + replacement;

fs.writeFileSync(file, newContent);
console.log("Rewrite successful");
