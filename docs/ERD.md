```mermaid
erDiagram
    PAINT_COLOR ||--o{ ORDER : "paint color for"
    INTERIOR ||--o{ ORDER : "interior for"
    TECHNOLOGY ||--o{ ORDER : "technology for"
    WHEELS ||--o{ ORDER : "wheels for"

    PAINT_COLOR {
        int id
        string name
        decimal price
    }

    INTERIOR {
        int id
        string name
        decimal price
    }

    TECHNOLOGY {
        int id
        string name
        decimal price
    }

    WHEELS {
        int id
        string name
        decimal price
    }

    ORDER {
        int id
        int paintColorId
        int interiorId
        int technologyId
        int wheelsId
        decimal totalPrice
        datetime createdAt
    }