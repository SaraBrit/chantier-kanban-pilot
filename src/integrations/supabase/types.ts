export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_date: string | null
          created_at: string | null
          id: string
          id_projet: number | null
          is_read: boolean | null
          message: string | null
          severity: string | null
          type: string | null
        }
        Insert: {
          alert_date?: string | null
          created_at?: string | null
          id?: string
          id_projet?: number | null
          is_read?: boolean | null
          message?: string | null
          severity?: string | null
          type?: string | null
        }
        Update: {
          alert_date?: string | null
          created_at?: string | null
          id?: string
          id_projet?: number | null
          is_read?: boolean | null
          message?: string | null
          severity?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_id_projet_fkey"
            columns: ["id_projet"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          doc_type: string | null
          extracted_data: Json | null
          file_name: string
          file_type: string
          id: string
          storage_path: string
          uploaded_at: string | null
          uploader: string | null
        }
        Insert: {
          doc_type?: string | null
          extracted_data?: Json | null
          file_name: string
          file_type: string
          id?: string
          storage_path: string
          uploaded_at?: string | null
          uploader?: string | null
        }
        Update: {
          doc_type?: string | null
          extracted_data?: Json | null
          file_name?: string
          file_type?: string
          id?: string
          storage_path?: string
          uploaded_at?: string | null
          uploader?: string | null
        }
        Relationships: []
      }
      electronic_archives: {
        Row: {
          archived_by: string | null
          created_at: string
          document_category: string | null
          extracted_text: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          metadata: Json | null
          original_name: string
          project_id: number | null
          status: string | null
          storage_path: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          archived_by?: string | null
          created_at?: string
          document_category?: string | null
          extracted_text?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          metadata?: Json | null
          original_name: string
          project_id?: number | null
          status?: string | null
          storage_path: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          archived_by?: string | null
          created_at?: string
          document_category?: string | null
          extracted_text?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          metadata?: Json | null
          original_name?: string
          project_id?: number | null
          status?: string | null
          storage_path?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "electronic_archives_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
      Factures: {
        Row: {
          "Date échéance": string | null
          "Date émission": string | null
          Description: string
          Montant: number | null
          Numéro: string
          Statut: string | null
        }
        Insert: {
          "Date échéance"?: string | null
          "Date émission"?: string | null
          Description: string
          Montant?: number | null
          Numéro?: string
          Statut?: string | null
        }
        Update: {
          "Date échéance"?: string | null
          "Date émission"?: string | null
          Description?: string
          Montant?: number | null
          Numéro?: string
          Statut?: string | null
        }
        Relationships: []
      }
      job_requests: {
        Row: {
          created_at: string | null
          id: string
          position: string
          project_id: number | null
          quantity: number
          request_date: string
          status: string | null
          urgency: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          position: string
          project_id?: number | null
          quantity: number
          request_date: string
          status?: string | null
          urgency?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          position?: string
          project_id?: number | null
          quantity?: number
          request_date?: string
          status?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
      material_requests: {
        Row: {
          created_at: string | null
          id: string
          material: string
          project_id: number | null
          quantity: string
          request_date: string | null
          status: string | null
          urgency: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          material: string
          project_id?: number | null
          quantity: string
          request_date?: string | null
          status?: string | null
          urgency?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          material?: string
          project_id?: number | null
          quantity?: string
          request_date?: string | null
          status?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
      Projet: {
        Row: {
          "Actual Budget": number | null
          Adresse: string | null
          Avancement: number | null
          "Chef de projet": string | null
          creation: string | null
          Debut: string | null
          "Fact. mensuelle": number | null
          Fin: string | null
          id: number
          "Maître d'ouvrage": string | null
          Statut: string
          "Total Budget": number | null
        }
        Insert: {
          "Actual Budget"?: number | null
          Adresse?: string | null
          Avancement?: number | null
          "Chef de projet"?: string | null
          creation?: string | null
          Debut?: string | null
          "Fact. mensuelle"?: number | null
          Fin?: string | null
          id?: number
          "Maître d'ouvrage"?: string | null
          Statut: string
          "Total Budget"?: number | null
        }
        Update: {
          "Actual Budget"?: number | null
          Adresse?: string | null
          Avancement?: number | null
          "Chef de projet"?: string | null
          creation?: string | null
          Debut?: string | null
          "Fact. mensuelle"?: number | null
          Fin?: string | null
          id?: number
          "Maître d'ouvrage"?: string | null
          Statut?: string
          "Total Budget"?: number | null
        }
        Relationships: []
      }
      supplementary_contracts: {
        Row: {
          amount: number | null
          client: string | null
          contract_number: string | null
          created_at: string | null
          description: string | null
          id: string
          period_end: string | null
          period_start: string | null
          project_id: string | null
          signature_date: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          client?: string | null
          contract_number?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          project_id?: string | null
          signature_date?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          client?: string | null
          contract_number?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          project_id?: string | null
          signature_date?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      surveyor_reports: {
        Row: {
          achieved_quantity: string
          created_at: string | null
          description: string
          id: string
          percentage: number
          phase: string
          planned_quantity: string
          project_id: number | null
          report_date: string
          status: string | null
          validator: string
        }
        Insert: {
          achieved_quantity: string
          created_at?: string | null
          description: string
          id?: string
          percentage: number
          phase: string
          planned_quantity: string
          project_id?: number | null
          report_date: string
          status?: string | null
          validator: string
        }
        Update: {
          achieved_quantity?: string
          created_at?: string | null
          description?: string
          id?: string
          percentage?: number
          phase?: string
          planned_quantity?: string
          project_id?: number | null
          report_date?: string
          status?: string | null
          validator?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveyor_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
      Tâches: {
        Row: {
          "Assigné à": string | null
          Avancement: number | null
          Description: string
          Échéance: string | null
          Id: number | null
          Priorité: string | null
          Statut: string | null
          Tache: string
        }
        Insert: {
          "Assigné à"?: string | null
          Avancement?: number | null
          Description: string
          Échéance?: string | null
          Id?: number | null
          Priorité?: string | null
          Statut?: string | null
          Tache: string
        }
        Update: {
          "Assigné à"?: string | null
          Avancement?: number | null
          Description?: string
          Échéance?: string | null
          Id?: number | null
          Priorité?: string | null
          Statut?: string | null
          Tache?: string
        }
        Relationships: [
          {
            foreignKeyName: "Tâches_Id_fkey"
            columns: ["Id"]
            isOneToOne: false
            referencedRelation: "Projet"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
