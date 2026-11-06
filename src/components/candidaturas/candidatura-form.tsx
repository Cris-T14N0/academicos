"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Select, Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses } from "@/lib/data/courses";

const schema = z.object({
  name: z.string().min(3, "Indica o teu nome completo."),
  email: z.string().email("Introduz um email válido."),
  phone: z.string().min(9, "Introduz um número de telefone válido.").regex(/^[+\d\s()-]+$/, "Usa apenas números e os símbolos + ( ) -."),
  documentType: z.string().min(2, "Seleciona o tipo de documento."),
  documentNumber: z.string().min(5, "Introduz o número do documento."),
  nationality: z.string().min(2, "Indica a nacionalidade."),
  birthDate: z.string().min(4, "Indica a data de nascimento."),
  course: z.string().min(2, "Seleciona o curso pretendido."),
  previousSchool: z.string().min(3, "Indica a escola de origem."),
  average: z.string().optional(),
  motivation: z.string().max(600, "Máximo de 600 caracteres.").optional(),
  consent: z.literal(true, {
    message: "Tens de aceitar a política de privacidade para continuar.",
  }),
});

type FormValues = z.infer<typeof schema>;

const fieldsByStep: Record<number, (keyof FormValues)[]> = {
  1: ["name", "email", "phone", "documentType", "documentNumber", "nationality", "birthDate"],
  2: ["course", "previousSchool", "average", "motivation"],
  3: ["consent"],
};

function buildProtocol() {
  const year = new Date().getFullYear();
  const sequence = Math.floor(100000 + Math.random() * 900000);
  return `CAND-${year}-${sequence}`;
}

export function CandidaturaForm() {
  const [step, setStep] = useState(1);
  const [protocol, setProtocol] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { documentType: "Cartão de Cidadão", course: "", consent: undefined },
    mode: "onTouched",
  });

  const values = useWatch({ control });
  const selectedCourse = courses.find((course) => course.slug === values.course);

  async function nextStep() {
    if (await trigger(fieldsByStep[step], { shouldFocus: true })) {
      setStep((current) => current + 1);
    }
  }

  async function onSubmit(values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const generated = buildProtocol();
    setProtocol(generated);
    toast.success("Candidatura registada", { description: `Protocolo ${generated}.` });
    console.log("Candidatura (demonstração):", values);
  }

  if (protocol) {
    return (
      <section className="border-t border-emerald-600 pt-6" aria-live="polite">
        <CheckCircle2 className="size-6 text-emerald-600" />
        <h2 className="font-display mt-4 text-2xl font-semibold">Pedido registado</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta demonstração não envia dados para a universidade. Guarda o protocolo:
        </p>
        <p className="mt-3 font-mono text-lg font-semibold">{protocol}</p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setProtocol(null);
            setStep(1);
          }}
        >
          Iniciar outro pedido
        </Button>
      </section>
    );
  }

  return (
    <div>
      <ol className="mb-8 flex gap-6 border-b border-border pb-3 text-sm" aria-label="Passos da candidatura">
        {["Dados pessoais", "Curso pretendido", "Confirmação"].map((label, index) => (
          <li
            key={label}
            aria-current={step === index + 1 ? "step" : undefined}
            className={step === index + 1 ? "font-semibold text-foreground" : "text-muted-foreground"}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" autoComplete="name" {...register("name")} />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" autoComplete="tel" {...register("phone")} />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <Label htmlFor="nationality">Nacionalidade</Label>
              <Input id="nationality" autoComplete="country-name" {...register("nationality")} />
              <FieldError message={errors.nationality?.message} />
            </div>
            <div>
              <Label htmlFor="documentType">Tipo de documento</Label>
              <Select id="documentType" {...register("documentType")}>
                <option>Cartão de Cidadão</option>
                <option>Passaporte</option>
                <option>Título de residência</option>
                <option>Outro</option>
              </Select>
              <FieldError message={errors.documentType?.message} />
            </div>
            <div>
              <Label htmlFor="documentNumber">Número do documento</Label>
              <Input id="documentNumber" {...register("documentNumber")} />
              <FieldError message={errors.documentNumber?.message} />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input id="birthDate" type="date" autoComplete="bday" {...register("birthDate")} />
              <FieldError message={errors.birthDate?.message} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="max-w-xl">
            <Label htmlFor="course">Curso pretendido</Label>
            <Select id="course" {...register("course")}>
              <option value="">Seleciona um curso</option>
              {courses.map((course) => (
                <option key={`${course.degree}-${course.slug}`} value={course.slug}>
                  {course.name} · {course.degree}
                </option>
              ))}
            </Select>
            <FieldError message={errors.course?.message} />
            {selectedCourse ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {selectedCourse.degree} · {selectedCourse.duration} · {selectedCourse.ects} ECTS
              </p>
            ) : null}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="previousSchool">Escola de origem</Label>
                <Input id="previousSchool" {...register("previousSchool")} />
                <FieldError message={errors.previousSchool?.message} />
              </div>
              <div>
                <Label htmlFor="average">Média de conclusão (opcional)</Label>
                <Input id="average" inputMode="decimal" {...register("average")} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="motivation">Motivação (opcional)</Label>
                <Textarea id="motivation" rows={3} {...register("motivation")} />
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="max-w-xl">
            <h3 className="font-display text-xl font-semibold">Confirma os dados</h3>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              <Summary label="Nome" value={values.name || "—"} />
              <Summary label="Email" value={values.email || "—"} />
              <Summary label="Telefone" value={values.phone || "—"} />
              <Summary label="Curso" value={selectedCourse?.name || "—"} />
              <Summary label="Escola de origem" value={values.previousSchool || "—"} />
            </dl>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-brand-600"
                {...register("consent")}
              />
              <span>
                Aceito a <a href="/privacidade" className="font-semibold text-primary underline underline-offset-4">política de privacidade</a>.
              </span>
            </label>
            <FieldError message={errors.consent?.message} />
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((current) => current - 1)}
              disabled={isSubmitting}
            >
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
          ) : <span />}
          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              Submeter pedido
              {!isSubmitting ? <ArrowRight className="size-4" /> : null}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs font-medium text-destructive">{message}</p> : null;
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
