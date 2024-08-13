document.addEventListener("DOMContentLoaded", () => {
  const sidebarNavItems = document.querySelectorAll(".sidebar__nav-item");
  const content = document.querySelectorAll(".content");
  const emptyContent = document.querySelectorAll(".empty-content");
  const paginationNavItems = document.querySelectorAll(
    ".customers__pagination-btn"
  );
  const sidebar = document.querySelector(".sidebar");
  const burgerBtn = document.querySelector(".burger-btn");
  const searchInput = document.querySelector(".search__input");
  const tableBody = document.querySelector(".table_body");
  const prevArrow = document.querySelector(".customers__pagination-prev");
  const nextArrow = document.querySelector(".customers__pagination-next");

  let sidebarStatus = false;

  const showContent = (selectedItem) => {
    if (selectedItem.textContent !== "Customers") {
      content.forEach((item) => {
        item.style.display = "none";
      });
      emptyContent.forEach((item) => {
        item.style.display = "block";
      });
    } else {
      content.forEach((item) => {
        item.style.display = "block";
      });
      emptyContent.forEach((item) => {
        item.style.display = "none";
      });
    }
  };

  const clearSelectedSidebarStatus = async () => {
    let selectedItem = null;

    await sidebarNavItems.forEach((item) => {
      item.classList.remove("sidebar__nav-item--selected");
    });

    sidebarNavItems.forEach((item) => {
      if (item.className.includes("sidebar__nav-item--selected")) {
        selectedItem = item;
      }
    });

    showContent(selectedItem);
  };

  let selectedItemPag = paginationNavItems[0];

  const clearSelectedPaginationStatus = async () => {
    await paginationNavItems.forEach((item) => {
      item.classList.remove("customers__pagination-btn--selected");
    });

    paginationNavItems.forEach((item) => {
      if (item.className.includes("customers__pagination-btn--selected")) {
        selectedItemPag = item;
      }
    });
  };

  if (prevArrow) {
    prevArrow.addEventListener("click", () => {
      if (selectedItemPag) {
        const currentIndex =
          Array.from(paginationNavItems).indexOf(selectedItemPag);
        if (currentIndex > 0) {
          selectedItemPag.classList.remove(
            "customers__pagination-btn--selected"
          );
          selectedItemPag = paginationNavItems[currentIndex - 1];
          selectedItemPag.classList.add("customers__pagination-btn--selected");
        }
      }
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener("click", () => {
      if (selectedItemPag) {
        const currentIndex =
          Array.from(paginationNavItems).indexOf(selectedItemPag);
        if (currentIndex < paginationNavItems.length - 1) {
          selectedItemPag.classList.remove(
            "customers__pagination-btn--selected"
          );
          selectedItemPag = paginationNavItems[currentIndex + 1];
          selectedItemPag.classList.add("customers__pagination-btn--selected");
        }
      }
    });
  }

  const openSideBar = () => {
    sidebarStatus = true;
    burgerBtn.classList.add("burger-btn--open");
    sidebar.classList.add("sidebar--open");
  };

  const closeSidebar = () => {
    sidebarStatus = false;
    burgerBtn.classList.remove("burger-btn--open");
    sidebar.classList.remove("sidebar--open");
  };

  if (sidebarNavItems) {
    sidebarNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        clearSelectedSidebarStatus();
        closeSidebar();
        item.classList.add("sidebar__nav-item--selected");
      });
    });
  }

  if (paginationNavItems) {
    paginationNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        clearSelectedPaginationStatus();
        item.classList.add("customers__pagination-btn--selected");
      });
    });
  }

  if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
      sidebarStatus ? closeSidebar() : openSideBar();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const searchValue = event.target.value.toLowerCase();

      Array.from(tableBody.children || []).forEach((child) => {
        if (child.classList.contains("table__row-body")) {
          const rowText = child.textContent.toLowerCase();
          if (rowText.includes(searchValue)) {
            child.style.display = "";
          } else {
            child.style.display = "none";
          }
        }
      });
    });
  }
});
