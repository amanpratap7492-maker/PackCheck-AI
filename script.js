```javascript
document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const imageInput =
        document.getElementById("imageInput");

    const imagePreview =
        document.getElementById("imagePreview");

    const previewContainer =
        document.getElementById("previewContainer");

    const fileName =
        document.getElementById("fileName");

    const analyzeBtn =
        document.getElementById("analyzeBtn");

    const loading =
        document.getElementById("loading");

    const resultSection =
        document.getElementById("resultSection");


    // Result

    const complianceStatus =
        document.getElementById("complianceStatus");

    const complianceScore =
        document.getElementById("complianceScore");

    const complianceScoreBar =
        document.getElementById("complianceScoreBar");

    const scoreDescription =
        document.getElementById("scoreDescription");

    const confidence =
        document.getElementById("confidence");

    const confidenceBar =
        document.getElementById("confidenceBar");


    // Extracted data

    const productName =
        document.getElementById("productName");

    const netQuantity =
        document.getElementById("netQuantity");

    const mrp =
        document.getElementById("mrp");

    const manufacturer =
        document.getElementById("manufacturer");

    const fssai =
        document.getElementById("fssai");

    const mfgDate =
        document.getElementById("mfgDate");

    const useBy =
        document.getElementById("useBy");

    const batchNumber =
        document.getElementById("batchNumber");


    // Issues

    const issuesList =
        document.getElementById("issuesList");


    // History

    const historyList =
        document.getElementById("historyList");

    const historyEmpty =
        document.getElementById("historyEmpty");

    const historyLoading =
        document.getElementById("historyLoading");

    const refreshHistoryBtn =
        document.getElementById("refreshHistoryBtn");

    const clearHistoryBtn =
        document.getElementById("clearHistoryBtn");


    // =====================================================
    // HELPER - SET VALUE
    // =====================================================

    function setValue(element, value) {

        if (!element) {
            return;
        }

        if (
            value === null ||
            value === undefined ||
            value === "" ||
            value === "null"
        ) {

            element.textContent =
                "Not detected";

            return;
        }


        if (Array.isArray(value)) {

            if (value.length === 0) {

                element.textContent =
                    "Not detected";

            } else {

                element.textContent =
                    value.join(", ");
            }

            return;
        }


        element.textContent =
            String(value);
    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value);

        return div.innerHTML;
    }


    // =====================================================
    // IMAGE SELECTION
    // =====================================================

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files &&
                    this.files.length > 0
                        ? this.files[0]
                        : null;


                if (!file) {

                    fileName.textContent =
                        "No image selected";

                    previewContainer.classList.add(
                        "hidden"
                    );

                    imagePreview.removeAttribute(
                        "src"
                    );

                    return;
                }


                // Validate image

                if (!file.type.startsWith("image/")) {

                    alert(
                        "Please select a valid image file."
                    );

                    this.value = "";

                    fileName.textContent =
                        "No image selected";

                    previewContainer.classList.add(
                        "hidden"
                    );

                    return;
                }


                // Show filename

                fileName.textContent =
                    "Selected: " + file.name;


                // Preview

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        imagePreview.src =
                            event.target.result;

                        previewContainer.classList.remove(
                            "hidden"
                        );
                    };


                reader.onerror =
                    function () {

                        alert(
                            "Unable to preview the selected image."
                        );
                    };


                reader.readAsDataURL(file);
            }
        );
    }


    // =====================================================
    // ANALYZE PRODUCT
    // =====================================================

    if (analyzeBtn) {

        analyzeBtn.addEventListener(
            "click",
            async function () {

                const file =
                    imageInput &&
                    imageInput.files &&
                    imageInput.files.length > 0
                        ? imageInput.files[0]
                        : null;


                if (!file) {

                    alert(
                        "Please select a product image first."
                    );

                    return;
                }


                // Disable button

                analyzeBtn.disabled = true;

                analyzeBtn.textContent =
                    "Analyzing...";


                // Show loading

                if (loading) {

                    loading.classList.remove(
                        "hidden"
                    );
                }


                // Hide old result

                if (resultSection) {

                    resultSection.classList.add(
                        "hidden"
                    );
                }


                try {

                    // FormData

                    const formData =
                        new FormData();

                    formData.append(
                        "file",
                        file
                    );


                    // Backend API

                    const response =
                        await fetch(
                            "/analyze",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    // Parse JSON

                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.detail ||
                            "Backend analysis failed."
                        );
                    }


                    console.log(
                        "PackCheck-AI Result:",
                        data
                    );


                    // Display result

                    displayResults(data);


                    // Show result

                    if (resultSection) {

                        resultSection.classList.remove(
                            "hidden"
                        );


                        setTimeout(() => {

                            resultSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }, 100);
                    }


                    // Refresh history

                    await loadHistory();


                } catch (error) {

                    console.error(
                        "Analysis Error:",
                        error
                    );


                    alert(
                        "Analysis failed.\n\n" +
                        error.message +
                        "\n\n" +
                        "Make sure FastAPI backend is running."
                    );


                } finally {

                    analyzeBtn.disabled = false;

                    analyzeBtn.textContent =
                        "🔍 Analyze Product";


                    if (loading) {

                        loading.classList.add(
                            "hidden"
                        );
                    }
                }

            }
        );
    }


    // =====================================================
    // DISPLAY RESULTS
    // =====================================================

    function displayResults(data) {

        // =================================================
        // STATUS
        // =================================================

        const status =
            data.compliance_status ||
            "Unknown";


        if (complianceStatus) {

            complianceStatus.textContent =
                status;


            complianceStatus.classList.remove(
                "status-compliant",
                "status-review",
                "status-non-compliant"
            );


            const statusLower =
                status.toLowerCase();


            if (
                statusLower.includes(
                    "non-compliant"
                )
            ) {

                complianceStatus.classList.add(
                    "status-non-compliant"
                );

            } else if (
                statusLower.includes(
                    "review"
                )
            ) {

                complianceStatus.classList.add(
                    "status-review"
                );

            } else if (
                statusLower.includes(
                    "likely compliant"
                )
            ) {

                complianceStatus.classList.add(
                    "status-compliant"
                );

            } else {

                complianceStatus.classList.add(
                    "status-review"
                );
            }
        }


        // =================================================
        // COMPLIANCE SCORE
        // =================================================

        let score =
            Number(data.compliance_score);


        if (Number.isNaN(score)) {
            score = 0;
        }


        score =
            Math.max(
                0,
                Math.min(100, score)
            );


        if (complianceScore) {

            complianceScore.textContent =
                Math.round(score) + "%";
        }


        if (complianceScoreBar) {

            complianceScoreBar.style.width =
                "0%";


            complianceScoreBar.classList.remove(
                "score-high",
                "score-medium",
                "score-low"
            );


            if (score >= 85) {

                complianceScoreBar.classList.add(
                    "score-high"
                );

            } else if (score >= 50) {

                complianceScoreBar.classList.add(
                    "score-medium"
                );

            } else {

                complianceScoreBar.classList.add(
                    "score-low"
                );
            }


            setTimeout(() => {

                complianceScoreBar.style.width =
                    score + "%";

            }, 100);
        }


        // =================================================
        // SCORE DESCRIPTION
        // =================================================

        if (scoreDescription) {

            if (score >= 85) {

                scoreDescription.textContent =
                    "The product appears to meet most packaging compliance requirements.";

            } else if (score >= 50) {

                scoreDescription.textContent =
                    "Some packaging compliance requirements may need attention.";

            } else {

                scoreDescription.textContent =
                    "Several packaging compliance issues were detected.";
            }
        }


        // =================================================
        // AI CONFIDENCE
        // =================================================

        let confidenceValue =
            Number(data.confidence);


        if (Number.isNaN(confidenceValue)) {

            confidenceValue = 0;
        }


        // Convert 0-1 to percentage

        if (
            confidenceValue > 0 &&
            confidenceValue <= 1
        ) {

            confidenceValue *= 100;
        }


        confidenceValue =
            Math.max(
                0,
                Math.min(100, confidenceValue)
            );


        if (confidence) {

            confidence.textContent =
                Math.round(
                    confidenceValue
                ) + "%";
        }


        if (confidenceBar) {

            confidenceBar.style.width =
                "0%";


            setTimeout(() => {

                confidenceBar.style.width =
                    confidenceValue + "%";

            }, 100);
        }


        // =================================================
        // EXTRACTED DATA
        // =================================================

        const extracted =
            data.extracted_data || {};


        setValue(
            productName,
            extracted.product_name
        );


        setValue(
            netQuantity,
            extracted.net_quantity
        );


        setValue(
            mrp,
            extracted.mrp
        );


        setValue(
            manufacturer,
            extracted.manufacturer
        );


        setValue(
            fssai,
            extracted.fssai_license_numbers
        );


        setValue(
            mfgDate,
            extracted.mfg_date
        );


        setValue(
            useBy,
            extracted.use_by
        );


        setValue(
            batchNumber,
            extracted.batch_number
        );


        // =================================================
        // ISSUES
        // =================================================

        displayIssues(
            data.issues_detected || []
        );
    }


    // =====================================================
    // DISPLAY ISSUES
    // =====================================================

    function displayIssues(issues) {

        if (!issuesList) {
            return;
        }


        issuesList.innerHTML =
            "";


        if (
            !Array.isArray(
