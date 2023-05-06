// Chart.js Pie Chart
const pieChartCtx = document.getElementById("pie-chart").getContext("2d");

const initialCategoryLabels = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
]; // Initial category labels
const initialCategoryData = [20, 30, 10, 40]; // Initial category data
let categoryLabels = [...initialCategoryLabels]; // Copy of the initial category labels array
let categoryData = [...initialCategoryData]; // Copy of the initial category data array
let numCustomCategories = 0; // Counter for the number of custom categories added

const pieChart = new Chart(pieChartCtx, {
  type: "pie",
  data: {
    labels: categoryLabels,
    datasets: [
      {
        label: "Categories",
        data: categoryData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#00E64D",
          "#E60073",
        ],
        borderWidth: 1,
      },
    ],
  },
});

// Category Modal
const categoryModal = new bootstrap.Modal(
  document.getElementById("categoryModal"),
  {}
);

function showCategoryModal() {
  categoryModal.show();
}

function addCategory() {
  const categoryName = document.getElementById("categoryName").value;
  const categoryValue = document
    .getElementById("categoryValue")
    .value.replace(/\D/g, "");

  if (!categoryName || !categoryValue) {
    return;
  }

  if (numCustomCategories < 4) {
    // Replace an initial category label and data
    const index = numCustomCategories;
    categoryLabels[index] = categoryName;
    categoryData[index] = categoryValue;
  } else if (numCustomCategories < 10) {
    // Add a new category label and data
    categoryLabels.push(categoryName);
    categoryData.push(categoryValue);
  } else {
    // Maximum of 10 categories reached, do nothing
    return;
  }

  numCustomCategories++;

  pieChart.update();

  // Update categories display
  const pieChartCategories = document.getElementById("pie-chart-categories");
  const categoriesHTML = categoryLabels
    .map((label, index) => {
      return `<span style="background-color: ${
        pieChart.data.datasets[0].backgroundColor[index]
      }" class="pie-chart-category">${label}: $${Number(
        categoryData[index]
      ).toLocaleString()}</span>`;
    })
    .join(" ");
  pieChartCategories.innerHTML = categoriesHTML;

  // Close modal and reset input fields
  const categoryModal = new bootstrap.Modal(
    document.getElementById("categoryModal")
  );
  categoryModal.hide();
  document.getElementById("categoryName").value = "";
  document.getElementById("categoryValue").value = "";
}
